import Propertylist from "./propertylist";

// Cấu hình metadata (SEO + title động)
export async function generateMetadata({ params }) {
  const title =
    params.type === "for-rent"
      ? "Neko Home - Cho thuê"
      : "Neko Home - Đăng bán";

  return {
    title,
    description: "Khám phá các bất động sản hiện có.",
  };
}

export default function Page({ params }) {
  return <Propertylist params={params} />;
}
