import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { blogPosts } from "@/lib/data/blog";
import { formatDate } from "@/lib/format";
import type { BlogPost } from "@/lib/types";

export function BlogSection() {
  return (
    <Section aria-labelledby="blog-title">
      <Container>
        <Reveal>
          <SectionHeader
            titleId="blog-title"
            title="Latest Posts"
            action={{ label: "Read All Posts", href: "/blog" }}
            actionVariant="secondary"
            actionClassName="max-lg:hidden lg:inline-flex"
          />
        </Reveal>

        <Stagger as="ul" className="mt-12 grid gap-grid-gap md:grid-cols-3">
          {blogPosts.map((post) => (
            <StaggerItem as="li" key={post.slug}>
              <PostCard post={post} />
            </StaggerItem>
          ))}
        </Stagger>

        {/* Below `lg` the way out sits under the posts; from `lg` it moves up
            beside the heading. */}
        <div className="mt-12 flex justify-center lg:hidden">
          <Button href="/blog" variant="secondary">
            Read All Posts
          </Button>
        </div>
      </Container>
    </Section>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="h-full">
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-lg bg-surface-alt transition-[box-shadow] transition-smooth hover:shadow-sm"
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={post.cover}
            alt={post.coverAlt}
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform transition-smooth-slow group-hover:scale-[1.02]"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap items-center gap-3 text-body-sm text-ink-4">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
          </div>

          <h3 className="mt-4 text-h4 text-ink-1 transition-colors transition-smooth group-hover:text-primary-600">
            {post.title}
          </h3>
        </div>
      </Link>
    </article>
  );
}
