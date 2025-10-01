"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 menit = 300 detik
  const [canResend, setCanResend] = useState(false);

  // Hitung mundur
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format timer mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleResend = () => {
    // Logic kirim ulang OTP
    setTimeLeft(300);
    setCanResend(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="flex text-2xl justify-center font-semibold text-shadow-dark-200">
        Verifikasi Email Anda
      </h1>
      <p className="text-dark-500 text-center">
        Masukkan kode OTP 6 digit yang telah kami kirim ke email Anda untuk
        mengonfirmasi akun dan mulai mengelola bisnis Anda.
      </p>

      <div className="flex justify-center">
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <p className="text-center text-sm text-dark-400">
        Waktu tersisa:{" "}
        <span className="font-semibold">{formatTime(timeLeft)}</span>
      </p>

      <Button className="w-full mt-4 bg-primary text-white hover:bg-primary/90">
        Verifikasi
      </Button>

      <p className="text-center text-sm text-dark-400 mt-2">
        Belum menerima kode?{" "}
        <button
          onClick={handleResend}
          disabled={!canResend}
          className={`font-semibold hover:underline ${
            canResend ? "text-primary" : "text-dark-400 cursor-not-allowed"
          }`}
        >
          Kirim ulang OTP
        </button>
      </p>
    </div>
  );
};

export default Page;
