import Ticker from "@/components/ticker";
import ScreenWrapper from "@/components/wrapper";

export default function Screen() {
    return (
        <ScreenWrapper>
            <Ticker text="This is a Ticker" />
        </ScreenWrapper>
    );
}