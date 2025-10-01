import Image from "next/image";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className="auth-container">
      <Image
        src="/images/background.png"
        alt="auth illustration"
        fill
        className="object-cover"
        priority
      />

      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-3">
            <Image src="/logo-main.svg" alt="logo" width={150} height={150} />
          </div>
          <div>{children}</div>
        </div>
      </section>
    </main>
  );
};

export default layout;
