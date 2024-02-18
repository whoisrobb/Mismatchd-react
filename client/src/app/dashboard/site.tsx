import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ContentSection from '@/layouts/content-section';
import SiteShell from '@/layouts/site-shell';
import { productCategories } from '@/lib/data-temp';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Pencil1Icon, PlusIcon } from '@radix-ui/react-icons';
import CategoryForm from '@/components/forms/category-form';
import { useEffect, useState } from 'react';
import { getCategory } from '@/lib/server-functions/site';
import SubcategoryForm from '@/components/forms/subcategory-form';
import { TCategory } from '@/lib/types/types';

const Site = () => {
  const [categories, setCategories] = useState<TCategory[]>([]);

  useEffect(() => {
    getCategories();
  }, [])

  const getCategories = async () => {
    const data = await getCategory();
    setCategories(data);
  }

  console.log(categories)

  return (
    <ContentSection
        title="Site"
        subtitle='Customize your site.'
        className='max-w-[900px]'
    >
      <SiteShell
        title="Categories"
      >
        <div className="mx-8 space-y-4">
            <Accordion type="multiple" className="w-full">
                {categories.length > 0 && categories.map((cat, index) => (
                <AccordionItem value={`item-${index+1}`} key={index}>
                    <AccordionTrigger className="capitalize text-secondary-foreground">
                      <p className="flex items-center gap-2">
                        {cat.title}
                        <Dialog>
                          <DialogTrigger>
                            <Button size={'icon'} variant={'ghost'} className='z-100'><Pencil1Icon /></Button> 
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add category item</DialogTitle>
                              <DialogDescription>

                                <SubcategoryForm categoryId={cat.categoryId} />

                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>

                      </p>
                    </AccordionTrigger>
                    {cat.Subcategories.length > 0 && cat.Subcategories.map((sub, index) => (
                    <div className="" key={index}>
                        <AccordionContent>
                            <div className="focus:text-secondary-foreground">{sub.title}</div>
                            <div className="text-muted-foreground focus:text-secondary-foreground">{sub.description}</div>
                        </AccordionContent>
                    </div>))}
                </AccordionItem>))}
            </Accordion>
            
            <Dialog>
              <DialogTrigger>
                <Button variant={'secondary'}>Add Category <PlusIcon className='ml-2' /></Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a new category.</DialogTitle>
                  <DialogDescription>
                    
                    <CategoryForm />

                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

        </div>
      </SiteShell>
    </ContentSection>
  )
}

export default Site