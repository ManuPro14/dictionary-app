const Divider: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex items-center w-full mt-6 mb-4">
      <span className="text-2xl font-bold italic text-gray-700 dark:text-gray-200">{text}</span>
      <div className="flex-grow border-t border-gray-300 ml-4"></div>
    </div>
  );
};

export default Divider;