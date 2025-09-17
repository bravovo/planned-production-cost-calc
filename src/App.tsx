import { useEffect, useState, type FormEvent } from 'react'
import './App.css'
import Input from './components/input/Input';
import type { Product, Row } from './types/types';
import { addProduct, getAllProducts, removeAllProducts } from '../db/db';
import CalcTable from './components/calcTable/CalcTable';

const rows: Row[] = [
  { id: 1, name: "Сировина та основні матеріали", key: "materials" },
  { id: 2, name: "Допоміжні матеріали", key: "addMaterials" },
  { id: 3, name: "Зворотні відходи (-)", key: "waste" },
  { id: 4, name: "Основна з/п виробничих робітників", key: "mainSalary" },
  { id: 5, name: "Додаткова з/п виробничих робітників", key: "addSalary" },
  { id: 6, name: "Нараховано ЄСВ", key: 'tax' },
  { id: 7, name: "Витрати на підготовку та освоєння виробництва", key: "prepCosts" },
  { id: 8, name: "Загальновиробничі витрати", key: "genCosts" },
  { id: 9, name: "Адміністративні витрати", key: 'adminCosts' },
];

function App() {
  const [name, setName] = useState<string>('');
  const [materials, setMaterials] = useState<number>(0);
  const [addMaterials, setAddMaterials] = useState<number>(0);
  const [waste, setWaste] = useState<number>(0);
  const [mainSalary, setMainSalary] = useState<number>(0);
  const [addSalary, setAddSalary] = useState<number>(0);
  const [genCosts, setGenCosts] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getProducts() {
      setProducts(await getAllProducts());
    }

    getProducts();
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    if (!name) {
      window.alert("Для збереження потрібно ввести назву продукту");
      return;
    }

    const tax = 0.22 * (mainSalary + addSalary);
    const prepCosts = 2 * mainSalary;
    const adminCosts = 1.2 * mainSalary;

    const unitCosts = mainSalary + addSalary + tax + prepCosts + genCosts + adminCosts;
    const totalCosts = unitCosts * quantity;

    const product: Product = {
      name,
      materials,
      addMaterials,
      waste,
      mainSalary,
      addSalary,
      genCosts,
      quantity,
      prepCosts,
      tax,
      adminCosts,
      unitCosts,
      totalCosts
    }

    const isSuccess = await addProduct(product);

    if (isSuccess) {
      setProducts(await getAllProducts());
      resetInputs();
    }
  }

  function resetInputs() {
    setName('');
    setAddMaterials(0);
    setAddSalary(0);
    setGenCosts(0);
    setMainSalary(0);
    setMaterials(0);
    setQuantity(0);
    setWaste(0);
  }

  async function resetTable() {
    await removeAllProducts();
    setProducts([]);
  }

  return (
    <div className='flex flex-col gap-4 justify-center items-center'>
      <form className='w-[700px] flex flex-col justify-center items-start p-3 border-[#282828] border-2 rounded-2xl gap-1' onSubmit={onSubmit}>
        <div className='w-full flex flex-col justify-center items-center'><h2 className='text-3xl font-bold'>Додати продукцію</h2></div>
        <Input label='Назва' type='text' name='name' onChange={(e) => setName(e.target.value)} value={name} />
        <Input label='Сировина та основні матеріали' type='number' name='materials' onChange={(e) => setMaterials(+e.target.value)} value={materials} />
        <Input label='Допоміжні матеріали' type='number' name='add-materials' onChange={(e) => setAddMaterials(+e.target.value)} value={addMaterials} />
        <Input label='Зворотні відходи' type='number' name='waste' onChange={(e) => setWaste(+e.target.value)} value={waste} />
        <Input label='Основна з/п виробничих робітників (грн)' type='number' name='main-salary' onChange={(e) => setMainSalary(+e.target.value)} value={mainSalary} />
        <Input label='Додаткова з/п виробничих робітників (грн)' type='number' name='add-salary' onChange={(e) => setAddSalary(+e.target.value)} value={addSalary} />
        <Input label='Загальновиробничі витрати' type='number' name='gen-costs' onChange={(e) => setGenCosts(+e.target.value)} value={genCosts} />
        <Input label='Кількість продукції' type='number' name='quantity' onChange={(e) => setQuantity(+e.target.value)} value={quantity} />
        <div className='w-full flex flex-row justify-end items-center mt-1 gap-1'>
          <button type='button' onClick={resetInputs}>Очистити поля</button>
          <button type='button' onClick={resetTable}>Очистити дані таблиці</button>
          <button type='submit'>Додати продукцію</button>
        </div>
      </form>

      {products.length > 0 && <CalcTable products={products} rows={rows} />}
    </div>
  )
}

export default App
