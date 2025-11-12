"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID", // Ganti dengan Service ID EmailJS kamu
        "YOUR_TEMPLATE_ID", // Ganti dengan Template ID EmailJS kamu
        formRef.current,
        "YOUR_PUBLIC_KEY" // Ganti dengan Public Key EmailJS kamu
      )
      .then(() => {
        setSubmitted(true);
        setLoading(false);
        formRef.current?.reset();
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#80cff9]  text-[#0a2e47] px-4 sm:px-8 lg:px-16 py-20 border border-[#1ca7ec]" id="Contact">
      {/* Judul */}
      <h1 className="text-4xl sm:text-5xl font-bold pb-12 text-center tracking-tight">
        #Kontak
      </h1>

      {/* Form Kontak */}
      <form
        ref={formRef}
        onSubmit={sendEmail}
        className="w-full max-w-2xl bg-[#0a2e47]/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white p-8 sm:p-10 flex flex-col gap-6 text-[#e1f1fd] "
      >
        <p className="text-center text-base sm:text-lg font-medium mb-4">
          Tolong kirim pesan hanya jika penting sekali.
        </p>

        {/* Input Nama & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input
            type="text"
            name="user_name"
            placeholder="Nama Anda"
            required
            className="border border-[#0a2e47] text-[#e1f1fd] placeholder-[#e1f1fd]/60 rounded-xl px-5 py-4 text-base sm:text-lg bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#0a2e47] transition"
          />
          <input
            type="email"
            name="user_email"
            placeholder="Email Anda"
            required
            className="border border-[#0a2e47] placeholder-[#e1f1fd]/60 rounded-xl px-5 py-4 text-base sm:text-lg bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#0a2e47] transition"
          />
        </div>

        {/* Pesan */}
        <textarea
          name="message"
          placeholder="Tulis pesan Anda di sini..."
          required
          rows={6}
          className="border border-[#0a2e47] placeholder-[#e1f1fd]/60 rounded-xl px-5 py-4 text-base sm:text-lg bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#ffffff] transition resize-none"
        />

        {/* Tombol Kirim */}
        <button
          type="submit"
          disabled={loading}
          className=" text-white font-semibold py-4 rounded-xl text-lg sm:text-xl hover:bg-[#0e476c] transition disabled:opacity-60 border border-[#e1f1fd] rounded-pill"
        >
          {loading ? "Mengirim..." : "Kirim Pesan"}
        </button>

        {/* Status Pesan */}
        {submitted && (
          <p className="text-green-600 text-center mt-3 font-medium">
            ✅ Pesan berhasil dikirim!
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
