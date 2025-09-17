type ScreenWrapperProps = {
    children: React.ReactNode;
};

export default function ScreenWrapper({ children }: ScreenWrapperProps) {
    return (
        <div>
            {children}
        </div>
    );
}