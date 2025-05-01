// // components/Meta.tsx
// import Head from 'next/head';

// interface MetaProps {
//   title: string;
//   description: string;
//   image: string;
//   url: string;
// }

// export default function Meta({ title, description, image, url }: MetaProps) {
//   return (
//     <Head>
//       <title>{title}</title>
//       <meta name="description" content={description} />

//       <meta property="og:type" content="website" />
//       <meta property="og:url" content={url} />
//       <meta property="og:title" content={title} />
//       <meta property="og:description" content={description} />
//       <meta property="og:image" content={image} />

//       <meta name="twitter:card" content="summary_large_image" />
//       <meta name="twitter:url" content={url} />
//       <meta name="twitter:title" content={title} />
//       <meta name="twitter:description" content={description} />
//       <meta name="twitter:image" content={image} />
//     </Head>
//   );
// }
