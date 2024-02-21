import ContentSection from "@/layouts/content-section";
import { useParams } from "react-router-dom";

const Category = () => {
    const { category } = useParams();
  return (
    <ContentSection
        title={category as string}
        subtitle={null}
    >
        Products
    </ContentSection>
  )
}

export default Category