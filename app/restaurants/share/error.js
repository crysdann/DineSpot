"use client";
function error({ error }) {
  return (
    <main className="error">
      <h1>An error occured!</h1>
      <p>Failed to create meal. </p>
    </main>
  );
}

export default error;
