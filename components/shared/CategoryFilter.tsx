"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/lib/database/models/category.model";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/lib/actions/category.actions";

const CategoryFilter = () => {  
  const searchParams = useSearchParams();
  const router = useRouter();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const defaultCategory = searchParams?.get('category') as string || '';

  useEffect(() => {
    const getCategories = async () => {
      const categoriesList = await getAllCategories();
      categoriesList && setCategories(categoriesList as ICategory[]);
    }
    getCategories();
  }, []);

  const onSelectCategory = (category: string) => {
    let newUrl = '';
    if (category && category !== 'All') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'category',
        value: category
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['category']
      });
    }
    router.push(newUrl, { scroll: false });
  }

  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)} defaultValue={defaultCategory}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>
        {categories.map((category: ICategory) => (
          <SelectItem 
            key={category._id} 
            value={category.name} 
            className="select-item p-regular-14"
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
};

export default CategoryFilter;