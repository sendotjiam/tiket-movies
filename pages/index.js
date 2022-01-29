import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
	return (
		<>
			<Head>
				<title>BNCC Movies</title>
				<meta name='description' content='BNCC Movies' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

      <main>
        <div>TEST</div>
        <Link href="/login">
          <a>LOGIN</a>
        </Link>
      </main>
		</>
	);
}
