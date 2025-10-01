export async function signUp(data: {
  email: string;
  password: string;
  fullName?: string; // optional, kalau form masih ada
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      Username: data.fullName ?? data.email.split("@")[0], // mapping manual
      password: data.password,
    }),
  });

  if (!res.ok) {
    return {
      success: false,
      error: `Server error: ${res.statusText}`,
    };
  }

  return { success: true };
}

export async function signIn(data: { email: string; password: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  if (!res.ok) {
    return {
      success: false,
      error: `Server error: ${res.statusText}`,
    };
  }

  return { success: true };
}

export async function submitTenantInfo(data: {
  companyName: string;
  industry: string;
  address: string;
  city: string;
  phone: string;
  fax?: string;
  logoUrl?: string;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tenant`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    return {
      success: false,
      error: `Server error: ${res.status} - ${errorText}`,
    };
  }

  return { success: true };
}
