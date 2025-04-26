import Home from "../app/(home)/home";
import Wrapper from "../app/layout-wrapper/wrapper";

export const metadata = {
  title: "Home v1 || Homez - Real Estate NextJS Template",
};

export default function MainRoot() {
  return (
    <Wrapper>
      <Home />
    </Wrapper>
  );
}
