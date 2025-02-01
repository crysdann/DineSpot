"use client";
function error({ error }) {
  return (
    <main className="error">
      <h1>An error occured!</h1>
      <p>Failed to fetch data. Please try again later. </p>
    </main>
  );
}

export default error;
