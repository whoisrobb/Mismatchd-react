import { createCategory } from "@/lib/server-functions/site";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const CategoryForm = () => {
  const [formTitle, setFormTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await createCategory(formTitle)
    setFormTitle('');
    setIsSubmitting(false);
  }
  return (
    <form onSubmit={(e) => {e.preventDefault(); handleSubmit()}} className="flex flex-col items-start gap-2 my-2">
      <Input
        placeholder="Add form title"
        value={formTitle}
        onChange={(e) => setFormTitle(e.target.value)}
      />
      <Button disabled={isSubmitting}>Create</Button>
    </form>
  )
}

export default CategoryForm;