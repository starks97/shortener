type AuthWrapperTypes = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function AuthWrapperForm({
  title,
  description,
  children,
}: AuthWrapperTypes) {
  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-black p-8 border-4 border-orange-900 rounded-2xl shadow-lg w-full max-w-md relative">
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-cyan-950 rounded-full shadow-lg flex items-center justify-center">
            <span className="text-white text-3xl font-bold">B</span>
          </div>
        </div>

        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-200 mt-8">
          {`${title} `}
          <span className="text-orange-500">ByteTrim!</span>
        </h2>
        <p className="text-gray-300 text-center mb-6">{description}</p>

        {children}
      </div>
    </div>
  );
}
