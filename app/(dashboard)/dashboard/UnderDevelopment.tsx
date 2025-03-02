import Link from "next/link";

export default function UnderDevelopment() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>🚧 Page Under Development 🚧</h1>
      <p>We are working hard to bring you this feature. Stay tuned!</p>
      
      <Link href="/" passHref>
        <button style={{ padding: "10px 20px", marginTop: "20px", cursor: "pointer" }}>
          Go to Homepage
        </button>
      </Link>
    </div>
  );
}
