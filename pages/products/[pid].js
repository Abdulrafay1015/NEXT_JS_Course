import { Fragment } from "react";
import path from "path"
import fs from "fs/promises"

const ProductDetails = (props) => {
    const {product} = props
    if (!product) {
        return <h4>Loading...</h4>
    }
    return (
      <Fragment>
        <h4>{product.title}</h4>
        <p>{product.desc}</p>
      </Fragment>
    );

}

async function getData () {
    const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
    const fileData = await fs.readFile(filePath);
    const jsonData = JSON.parse(fileData);

    return jsonData
}


export async function getStaticProps(context){
    const {params} = context

    // const filePath = path.join(process.cwd() , "data"  , "dummy-backend.json")
    // const fileData = await fs.readFile(filePath)
    // const jsonData = JSON.parse(fileData)
    const jsonData = await getData();

    const product = jsonData.products.find((val) => val.id === params.pid)

    if(!product){
        return { notFound: true };
    }
    return {
        props : {
            product
        }
    }
}

export async function getStaticPaths() {
    const data = await getData()
    const paramsWithId = data.products.map((product) => ({params : {pid : product.id}}))

    return {
        paths : paramsWithId,
        // paths: [
        // { params: { pid: "p1" } },
        // { params: { pid: "p2" } },
        // { params: { pid: "p3" } },
        // ],
        fallback: false,
    };
}
export default ProductDetails;