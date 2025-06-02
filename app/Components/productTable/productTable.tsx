// import { Product } from '../../types/products';
// import { deleteProduct } from '../../lib/api';
// import { useRouter } from 'next/navigation';
// import styles from './style.module.css'; // CSS Module

// export default function ProductTable({ products }: { products: Product[] }) {
//   const router = useRouter();

//   const handleDelete = async (id: string) => {
//     if (confirm('Are you sure to delete this product?')) {
//       await deleteProduct(id);
//       router.refresh(); // Refresh page
//     }
//   };

//   return (
//     <div className={styles.tableWrapper}>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Status</th>
//             <th>Quantity</th>
//             <th>Price</th>
//             <th>Category</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((p) => (
//             <tr key={p._id}>
//               <td>{p.name}</td>
//               <td>{p.status}</td>
//               <td>{p.quantity}</td>
//               <td>${p.price}</td>
//               <td>{p.category}</td>
//               <td>
//                 <a className={styles.editBtn} href={`/products/edit/${p._id}`}>Edit</a>
//                 <button className={styles.deleteBtn} onClick={() => handleDelete(p._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
