import Home from "./home/page";
import Wrapper from "./layout-wrapper/wrapper";

export const metadata = {
  title: "Neko home - Trang chủ",
};

export default function MainRoot() {
  return (
    <Wrapper>
      <Home />
    </Wrapper>
  );
}
