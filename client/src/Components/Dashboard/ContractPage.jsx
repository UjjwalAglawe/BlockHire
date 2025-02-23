import React from 'react';
import { useSelector } from 'react-redux';

function ContractPage() {
  const client = useSelector((state) => state.signup.client);

  const contract = [
    {
      smart_contract: '0x8aeg32dhghfedg46',
      status: 'ongoing',
      client: '0x4asd3242dfssfed546',
    },
    {
      smart_contract: '0x8aeg32dhghfedg46',
      status: 'completed',
      client: '0x4uud4532dhhsfed5hj',
    },
  ];

  return (
    <div className="flex flex-col justify-start p-6 bg-gray-50 min-h-screen font-title">
      <h1 className="text-2xl font-bold mb-4">Contracts</h1>
      {/* <h4 className="text-gray-500 mb-6">The </h4> */}
      <div className="space-y-4">
        {contract.map((value, index) => (
          <div
            key={index}
            className="motion-preset-expand motion-duration-250 flex flex-col p-4 border border-gray-300 shadow-lg rounded-xl bg-white hover:shadow-2xl transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              <span className="text-primary">Smart Contract:</span> {value.smart_contract}
            </h3>
            <h3 className="text-lg text-gray-600 mb-2">
              <span className="text-primary">{client === 'client' ? 'Freelancer' : 'Client'}:</span> {value.client}
            </h3>
            <h3 className="text-lg text-gray-600">
              <span className="text-primary">Status:</span>{' '}
              <span
                className={`px-2 py-1 rounded-lg ${
                  value.status === 'ongoing'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {value.status}
              </span>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContractPage;
