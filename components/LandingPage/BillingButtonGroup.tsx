interface BillingButtonGroupProps {
  billingInterval: string;
  setBillingInterval: (interval: string) => void;
}

export default function BillingButtonGroup({
  billingInterval,
  setBillingInterval
}: BillingButtonGroupProps) {
  return (
    <span className="isolate inline-flex rounded-md shadow-sm">
      <button
        onClick={() => setBillingInterval('month')}
        type="button"
        className={`${
          billingInterval === 'month'
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'text-gray-700 bg-white'
        } relative inline-flex items-center rounded-l-md px-4 py-2 text-sm font-medium focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
      >
        Monthly
      </button>
      <button
        onClick={() => setBillingInterval('year')}
        type="button"
        className={`${
          billingInterval === 'year'
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'text-gray-700 bg-white'
        } relative -ml-px inline-flex items-center rounded-r-md px-4 py-2 text-sm font-medium focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
      >
        Annual
      </button>
    </span>
  );
}
