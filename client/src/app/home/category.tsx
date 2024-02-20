import ContentSection from "@/layouts/content-section";
import { getCategory } from "@/lib/server-functions/dashboard";
import { TCategory } from "@/lib/types/types";
import { useEffect, useState } from "react";
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