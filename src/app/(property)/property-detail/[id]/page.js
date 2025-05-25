import PropertyDetail from "./PropertySingleContent";
import { apiProperties } from "@/apis/Properties";

export async function generateMetadata({ params }) {
  const { id } = params;
  const res = await apiProperties.getPropertiesDetail(id);
  const property = await res[0];
  console.log("Property Detail:", property);

  return {
    title: `Neko Home- ${property?.Title || "Chi tiết bất động sản"}`,
    description: property?.Description || "Chi tiết bất động sản tại Neko Home",
  };
}

export default function PropertyPage({ params }) {
  return <PropertyDetail id={params.id} />;
}
