// import Head from 'next/head'
// import Image from 'next/image'
import fs from 'fs/promises'
import Link from 'next/link';
import path from "path"
import styles from '../styles/Home.module.css'

export default function Home(props) {
  const {products} = props

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {products.map((val) => (
          <p key={val.id}>
            <Link href={`/products/${val.id}`}>{val.title}</Link>
          </p>
        ))}
        <h1>Hello World</h1>
      </div>
    </div>
  );
}

export async function getStaticProps() { 
  const filePath = path.join(process.cwd() , 'data' , 'dummy-backend.json')
  const fileData = await fs.readFile(filePath)
  const jsonData = JSON.parse(fileData)
  return {
    props : {
      products : jsonData.products
    },
  }
}

