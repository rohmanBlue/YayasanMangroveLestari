"use client";

import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CBadge,
  CSpinner,
  CForm,
  CFormInput,
  CButton,
} from "@coreui/react";
import Image from "next/image";

type Post = {
  id: string;
  platform: "Instagram" | "Facebook" | "YouTube";
  date: string; // ISO string
  title: string;
  content: string;
  mediaType: "image" | "video";
  mediaUrl: string;
};

const NewsSosmed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [platformFilter, setPlatformFilter] = useState<
    "All" | "Instagram" | "Facebook" | "YouTube"
  >("All");

  // 📅 State untuk filter tanggal upload YouTube
  const [youtubeDateFilter, setYoutubeDateFilter] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        // Ganti URL berikut dengan API kamu
        const res = await fetch("https://api.example.com/social/posts/latest");
        if (!res.ok) throw new Error(`Error fetching posts: ${res.statusText}`);
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (err: unknown) {
        setError("Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    const interval = setInterval(fetchPosts, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // ===== Filter berdasarkan platform dan tanggal upload YouTube =====
  const filtered = posts.filter((post) => {
    const matchPlatform =
      platformFilter === "All" || post.platform === platformFilter;

    if (platformFilter === "YouTube" && youtubeDateFilter) {
      const postDate = new Date(post.date).toISOString().split("T")[0];
      return matchPlatform && postDate === youtubeDateFilter;
    }

    return matchPlatform;
  });

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* ===== Calendar Filter YouTube Upload Date ===== */}
      <CCard className="mb-4 border-blue-300 shadow-sm">
        <CCardHeader className="bg-blue-100">
          <h5 className="mb-0 font-semibold text-blue-800">
            📅 Filter Upload YouTube
          </h5>
        </CCardHeader>
        <CCardBody>
          <CForm className="flex flex-col md:flex-row gap-3 items-center">
            <CFormInput
              type="date"
              label="Tanggal Upload YouTube"
              value={youtubeDateFilter}
              onChange={(e) => setYoutubeDateFilter(e.target.value)}
              className="max-w-sm"
              disabled={platformFilter !== "YouTube"}
            />
            {youtubeDateFilter && (
              <CButton
                color="secondary"
                variant="outline"
                onClick={() => setYoutubeDateFilter("")}
              >
                Reset
              </CButton>
            )}
          </CForm>

          {platformFilter !== "YouTube" && (
            <p className="text-sm text-gray-500 mt-2">
              🔍 Aktifkan filter <b>YouTube</b> untuk memilih tanggal upload.
            </p>
          )}

          {youtubeDateFilter && (
            <p className="text-sm text-gray-700 mt-3">
              Menampilkan upload YouTube pada tanggal:{" "}
              <strong>
                {new Date(youtubeDateFilter).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </strong>
            </p>
          )}
        </CCardBody>
      </CCard>

      {/* ===== Filter Tombol Platform ===== */}
      <div className="flex gap-2 mb-4 justify-center">
        {["All", "Instagram", "Facebook", "YouTube"].map((platform) => (
          <button
            key={platform}
            className={`px-4 py-2 rounded ${
              platformFilter === platform
                ? platform === "YouTube"
                  ? "bg-red-600 text-white"
                  : platform === "Instagram"
                  ? "bg-pink-500 text-white"
                  : platform === "Facebook"
                  ? "bg-blue-800 text-white"
                  : "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setPlatformFilter(platform as any)}
          >
            {platform}
          </button>
        ))}
      </div>

      {/* ===== Loading ===== */}
      {loading && (
        <div className="text-center py-10">
          <CSpinner color="primary" />
          <p>Loading posts…</p>
        </div>
      )}

      {/* ===== Error ===== */}
      {error && <div className="text-center text-red-500 py-4">{error}</div>}

      {/* ===== Posts ===== */}
      {!loading && !error && (
        <CRow className="g-4">
          {filtered.map((post) => (
            <CCol xs={12} md={6} key={post.id}>
              <CCard>
                <CCardHeader className="flex justify-between items-center">
                  <span className="font-semibold">{post.title}</span>
                  <CBadge
                    color={
                      post.platform === "Instagram"
                        ? "pink"
                        : post.platform === "YouTube"
                        ? "danger"
                        : "primary"
                    }
                  >
                    {post.platform}
                  </CBadge>
                </CCardHeader>
                <CCardBody>
                  {post.mediaType === "video" ? (
                    <div className="aspect-video mb-2">
                      <iframe
                        src={post.mediaUrl}
                        title={post.title}
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  ) : (
                    <Image
                      src={post.mediaUrl}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full mb-2 rounded"
                    />
                  )}
                  <p className="text-sm text-gray-600">
                    {new Date(post.date).toLocaleString()}
                  </p>
                  <p className="mt-2">{post.content}</p>
                </CCardBody>
              </CCard>
            </CCol>
          ))}

          {filtered.length === 0 && (
            <CCol xs={12}>
              <p className="text-center text-gray-500 mt-6">
                Tidak ada posting untuk filter ini.
              </p>
            </CCol>
          )}
        </CRow>
      )}
    </div>
  );
};

export default NewsSosmed;
