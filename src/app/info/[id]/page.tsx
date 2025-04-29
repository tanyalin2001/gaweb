import { notFound } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkDirective from "remark-directive";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";

function remarkCards() {
  return (tree: any) => {
    visit(tree, (node: any) => {
      if (node.type === "containerDirective" && node.name === "cards") {
        node.data = {
          hName: "div",
          hProperties: { className: "cards" },
        };

        const newChildren = [];
        for (const child of node.children) {
          if (child.type === "paragraph") {
            newChildren.push(...child.children);
          } else {
            newChildren.push(child);
          }
        }
        node.children = newChildren;
      }
    });
  };
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "src/content/info");
  const files = await fs.readdir(dir);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      id: file.replace(/\.md$/, ""),
    }));
}

export default async function InfoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const filePath = path.join(process.cwd(), "src/content/info", `${id}.md`);

  let fileContent: string;
  try {
    fileContent = await fs.readFile(filePath, "utf8");
  } catch (error) {
    return notFound();
  }

  const { data, content } = matter(fileContent);

  return (
    <main className="relative min-h-screen text-white font-sans">
      <div className="absolute inset-0 z-[-2]">
        <div
          className="fixed inset-0 bg-[url('/coronation-bg.png')] bg-no-repeat bg-cover bg-center"
          style={{ zIndex: -2 }}
        />
      </div>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-[-1]" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 pt-32 pb-20 space-y-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#F28C7C] drop-shadow text-center">
          {data.title}
        </h1>

        <p className="text-sm text-gray-400 text-center">
          發布日期：{new Date(data.createdAt).toLocaleDateString("zh-TW")}
        </p>

        {data.coverUrl && (
          <img
            src={data.coverUrl}
            alt="封面圖片"
            className="rounded-xl w-full max-h-[500px] object-cover shadow-md"
          />
        )}

        <article className="prose prose-invert max-w-none text-gray-200 bg-[#1a1a1a]/80 p-6 rounded-2xl shadow-inner border border-white/10 space-y-8">
          <ReactMarkdown
            remarkPlugins={[remarkParse, remarkDirective, remarkCards]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-4xl font-bold mt-12 mb-4" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-3xl font-bold mt-10 mb-3 pb-1" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-2xl font-semibold mt-8 mb-2" {...props} />
              ),
              img: ({ node, ...props }) => (
                <img
                  {...props}
                  className="h-[330px] w-auto object-contain rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
                  alt={props.alt || ''}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc list-inside space-y-1" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a
                  {...props}
                  className="text-[#F28C7C] underline hover:text-[#fbb6a2] transition"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ),
              p: ({ node, children, ...props }) => {
                const isImageOnlyParagraph =
                  Array.isArray(children) &&
                  children.every(
                    (child) =>
                      typeof child === "object" &&
                      child !== null &&
                      "type" in child &&
                      child.type === "img"
                  );

                if (isImageOnlyParagraph) {
                  return <>{children}</>;
                }

                return <p className="leading-relaxed" {...props}>{children}</p>;
              },
              div: ({ node, className, ...props }) => {
                if (className === "cards") {
                  return (
                    <div className="w-full flex justify-center">
                      <div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 justify-center"
                        {...props}
                      />
                    </div>
                  );
                }
                return <div className={className} {...props} />;
              }
              
              
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
