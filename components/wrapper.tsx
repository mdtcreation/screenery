type ScreenWrapperProps = {
    children: React.ReactNode;
};

export default function ScreenWrapper({ children }: ScreenWrapperProps) {
    return (
        <div className="min-h-screen w-full p-3 bg-red-900 text-white flex flex-col">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-3 flex-1 flex flex-col">
                {children}
            </div>
        </div>
    );
}