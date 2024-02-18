import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
//   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { subcategorySchema } from "@/lib/validators/site";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { createSubcategory } from "@/lib/server-functions/site";

type InputSchema = z.infer<typeof subcategorySchema>

const SubcategoryForm = ({categoryId}: {categoryId: string}) => {
    const form = useForm<InputSchema>({
        resolver: zodResolver(subcategorySchema),
        defaultValues: {
            title: '',
            description: ''
        }
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async(values: InputSchema) => {
        const { title, description } = values;
        setIsSubmitting(true);
        await createSubcategory({ title, description, categoryId })
        setIsSubmitting(false);
    };
    
    return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="description" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting}>Submit</Button>
      </form>
    </Form>
  )
}

export default SubcategoryForm;