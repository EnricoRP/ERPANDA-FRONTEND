export const FIELD_NAMES = {
  username: "Username",
  email: "Email",
  password: "Password",
};

export const FIELD_TYPES = {
  username: "text",
  email: "email",
  password: "password",
};

export const FIELD_PLACEHOLDERS = {
  usernameOrEmail: "Masukkan email atau username",
  username: "Masukkan username",
  email: "Masukkan email",
  password: "Masukkan password",
  companyName: "Nama perusahaan Anda",
  industry: "Jenis industri / bidang usaha",
  address: "Alamat lengkap perusahaan",
  city: "Kota",
  phone: "Nomor telepon",
  fax: "Nomor fax",
  logoUrl: "Unggah logo perusahaan",
};

export const sorts = [
  {
    value: "oldest",
    label: "Oldest",
  },
  {
    value: "newest",
    label: "Newest",
  },
];

export const userRoles = [
  {
    value: "user",
    label: "User",
    bgColor: "bg-[#FDF2FA]",
    textColor: "text-[#C11574]",
  },
  {
    value: "admin",
    label: "Admin",
    bgColor: "bg-[#ECFDF3]",
    textColor: "text-[#027A48]",
  },
];

export const adminSideBarLinks = [
  {
    img: "/icons/admin/home.svg",
    route: "/",
    text: "Home",
  },
  {
    img: "/icons/admin/users.svg",
    route: "//users",
    text: "All Users",
  },
  {
    img: "/icons/admin/book.svg",
    route: "/books",
    text: "All Books",
  },
  {
    img: "/icons/admin/user.svg",
    route: "/account-requests",
    text: "Account Requests",
  },
];
