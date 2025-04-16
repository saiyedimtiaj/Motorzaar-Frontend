const PaymentDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-[rgb(var(--color-bg))] py-8 animate-pulse">
      <div className="max-w-3xl mx-auto px-4">
        <div className="h-10 w-32 bg-gray-300 rounded mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vehicle Details */}
          <div>
            <div className="p-6 mb-6 border-2 border-gray-300 rounded-sm space-y-4">
              <div className="h-6 w-40 bg-gray-300 rounded" />
              <div className="w-full h-48 bg-gray-200 rounded-lg" />
              <div className="h-6 w-3/4 bg-gray-300 rounded" />
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
            </div>

            <div className="p-6 border-2 border-gray-300 rounded-sm space-y-4">
              <div className="h-6 w-40 bg-gray-300 rounded" />
              <div className="h-20 bg-blue-200 rounded-sm" />
              <div className="h-20 bg-green-200 rounded-sm" />
              <div className="h-20 bg-gray-200 rounded-sm" />
            </div>
          </div>

          {/* Payment Form */}
          <div className="p-6 border-2 border-gray-300 rounded-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-200 rounded-lg w-10 h-10" />
              <div className="h-6 w-40 bg-gray-300 rounded" />
            </div>

            <div className="space-y-4">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-10 bg-gray-300 rounded" />

              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-10 bg-gray-300 rounded" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
                  <div className="h-10 bg-gray-300 rounded" />
                </div>
                <div>
                  <div className="h-4 w-10 bg-gray-200 rounded mb-2" />
                  <div className="h-10 bg-gray-300 rounded" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-16 bg-blue-100 rounded-sm" />
              <div className="h-16 bg-green-100 rounded-sm" />
            </div>

            <div className="h-12 bg-green-400 rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailSkeleton;
