const prisma = require("../dbConfig/prisma");

exports.addProject = async (req, res) => {
    try {
        const { freelancerId } = req.params;
        const { title, description, projectUrl, thumbnailUrl, tools } = req.body;

        console.log('Received project data:', {
            freelancerId,
            title,
            description,
            projectUrl,
            thumbnailUrl,
            tools
        });

        // Validate required fields
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required fields."
            });
        }

        // Create project with tools in a transaction
        const project = await prisma.$transaction(async (prisma) => {
            console.log('Starting transaction...');
            
            // Create the project
            console.log('Creating project with data:', {
                title,
                description,
                projectUrl,
                thumbnailUrl,
                freelancerId: parseInt(freelancerId)
            });

            const newProject = await prisma.freelancerProject.create({
                data: {
                    title,
                    description,
                    projectUrl,
                    thumbnailUrl,
                    freelancerId: parseInt(freelancerId)
                }
            });

            console.log('Project created:', newProject);

            // Add tools if provided
            if (tools && tools.length > 0) {
                console.log('Adding tools:', tools);
                await prisma.freelancerProjectTool.createMany({
                    data: tools.map(tool => ({
                        tool,
                        freelancerProjectId: newProject.id
                    }))
                });
                console.log('Tools added successfully');
            }

            // Fetch the complete project with tools
            const completeProject = await prisma.freelancerProject.findUnique({
                where: { id: newProject.id },
                include: {
                    tools: true
                }
            });

            console.log('Complete project fetched:', completeProject);
            return completeProject;
        });

        console.log('Transaction completed successfully');
        return res.status(201).json({
            success: true,
            message: "Project added successfully.",
            data: project
        });

    } catch (error) {
        console.error("Error adding project:", error);
        console.error("Error details:", {
            name: error.name,
            code: error.code,
            meta: error.meta,
            stack: error.stack
        });
        return res.status(500).json({
            success: false,
            message: "Failed to add project.",
            error: error.message,
            code: error.code
        });
    }
};

exports.getFreelancerProjects = async (req, res) => {
    try {
        const { freelancerId } = req.params;

        const projects = await prisma.freelancerProject.findMany({
            where: {
                freelancerId: parseInt(freelancerId)
            },
            include: {
                tools: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return res.status(200).json({
            success: true,
            data: projects
        });

    } catch (error) {
        console.error("Error fetching projects:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch projects.",
            error: error.message
        });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { title, description, projectUrl, thumbnailUrl, tools } = req.body;

        // Validate required fields
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required fields."
            });
        }

        // Update project and tools in a transaction
        const updatedProject = await prisma.$transaction(async (prisma) => {
            // Update the project
            const project = await prisma.freelancerProject.update({
                where: { id: parseInt(projectId) },
                data: {
                    title,
                    description,
                    projectUrl,
                    thumbnailUrl
                }
            });

            // Update tools if provided
            if (tools) {
                // Delete existing tools
                await prisma.freelancerProjectTool.deleteMany({
                    where: { freelancerProjectId: parseInt(projectId) }
                });

                // Add new tools
                if (tools.length > 0) {
                    await prisma.freelancerProjectTool.createMany({
                        data: tools.map(tool => ({
                            tool,
                            freelancerProjectId: parseInt(projectId)
                        }))
                    });
                }
            }

            // Fetch the complete updated project with tools
            return await prisma.freelancerProject.findUnique({
                where: { id: parseInt(projectId) },
                include: {
                    tools: true
                }
            });
        });

        return res.status(200).json({
            success: true,
            message: "Project updated successfully.",
            data: updatedProject
        });

    } catch (error) {
        console.error("Error updating project:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update project.",
            error: error.message
        });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        // Delete project and its tools in a transaction
        await prisma.$transaction(async (prisma) => {
            // Delete tools first (due to foreign key constraint)
            await prisma.freelancerProjectTool.deleteMany({
                where: { freelancerProjectId: parseInt(projectId) }
            });

            // Delete the project
            await prisma.freelancerProject.delete({
                where: { id: parseInt(projectId) }
            });
        });

        return res.status(200).json({
            success: true,
            message: "Project deleted successfully."
        });

    } catch (error) {
        console.error("Error deleting project:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete project.",
            error: error.message
        });
    }
};
