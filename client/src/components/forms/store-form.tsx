import {
    Form,
    FormControl,
  //   FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { storeSchema } from "@/lib/validators/dashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { createStore } from "@/lib/server-functions/dashboard";

type InputSchema = z.infer<typeof storeSchema>;

const StoreForm = () => {
    const { user } = useUser();
    const form = useForm<InputSchema>({
        resolver: zodResolver(storeSchema),
        defaultValues: {
            name: '',
            description: ''
        }
    })

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (values: InputSchema) => {
        const { name } = values;
        setIsSubmitting(true);
    
        if (user) {
            await createStore({ name, userId: user.id })
        }

        setIsSubmitting(false);
    }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store name</FormLabel>
              <FormControl>
                <Input placeholder="Add store name" {...field} />
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

export default StoreForm