import {
    Form,
    FormControl,
  //   FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { productSchema } from "@/lib/validators/dashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Dropzone from 'react-dropzone';
import { Cross2Icon } from "@radix-ui/react-icons";
import { TCategory } from "@/lib/types/types";
import { createProduct, getCategory } from "@/lib/server-functions/dashboard";

type InputSchema = z.infer<typeof productSchema>;

const ProductForm = ({ storeId }: {storeId: string}) => {
    const form = useForm<InputSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: '',
            description: '',
            category: '',
            subCategory: '',
            price: '',
            inventory: '',
            tags: '',
        }
    })
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [categories, setCategories] = useState<TCategory[]>([]);
  
    useEffect(() => {
      getCategories();
    }, [])
  
    const getCategories = async () => {
      const data = await getCategory();
      setCategories(data);
    }
    
    const onDrop = (acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
    };

    const removeFile = (index: number) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const onSubmit = async (values: InputSchema) => {
      setIsSubmitting(true);
        const { name, description, category, subCategory, price, inventory, tags } = values;
        const formData = new FormData();

        files.forEach((file) => {
            formData.append('file', file);
        });
        formData.append('name', name)
        formData.append('description', description)
        formData.append('category', category)
        formData.append('subCategory', subCategory)
        formData.append('price', price)
        formData.append('inventory', inventory)
        formData.append('tags', tags)

        await createProduct({formData, storeId});
      setIsSubmitting(false);
    }
    
  return (
    <div className="space-y-4">
    <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
            <section className='flex flex-col gap-2'>
                <div
                    {...getRootProps()}
                    className='p-12 border border-dashed cursor-pointer text-center rounded'
                >
                    <Input {...getInputProps()} />
                    <p className='text-sm text-muted-foreground'>Drag 'n' drop some files here, or click to select files</p>
                </div>
                {files.length >= 1 &&
                    <div className="flex flex-col gap-1">
                        {files.map((file, index) => (
                            <div key={index} className="border py-1 px-2 rounded flex justify-between items-center">
                                <div className="leading-tight">
                                    <p className='text-sm text-muted-foreground'>{file.name}</p>
                                </div>
                                <Button variant={'ghost'} size={'icon'} onClick={() => removeFile(index)}><Cross2Icon /></Button>
                            </div>
                        ))}
                    </div>}
            </section>
        )}
    </Dropzone>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product name</FormLabel>
              <FormControl>
                <Input placeholder="Add product name" {...field} />
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
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Set category</FormLabel>
                <FormControl>

                  <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                          <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                          {categories.map((cat) => (
                              <SelectItem value={cat.title} key={cat.categoryId}>{cat.title}</SelectItem>
                          ))}
                      </SelectContent>
                  </Select>

                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Set sub-category</FormLabel>
                <FormControl>

                  <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                          <SelectValue placeholder="Set sub-category" />
                      </SelectTrigger>
                      <SelectContent>
                          
                      {categories.map((category) => (
                          <div key={category.categoryId}>
                          {category.Subcategories.map((subcategory) => (
                              <SelectItem value={subcategory.title} key={subcategory.subcategoryId} className="subcategory">{subcategory.title}</SelectItem>
                          ))}
                          </div>
                      ))}
                      </SelectContent>
                  </Select>

                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Set price</FormLabel>
                <FormControl>
                  <Input placeholder="Set price" {...field} />
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
            name="inventory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Set inventory</FormLabel>
                <FormControl>
                  <Input placeholder="Set inventory" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Set tag</FormLabel>
              <FormControl>
                <Input placeholder="Set tag" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting || files.length === 0}>Submit</Button>
      </form>
    </Form>
    </div>
  )
}

export default ProductForm;