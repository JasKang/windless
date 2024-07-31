import mdx from '@mdx-js/rollup'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { mdxJsxToMarkdown } from 'mdast-util-mdx-jsx'
import { toMarkdown } from 'mdast-util-to-markdown'
import remarkMatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    {
      enforce: 'pre',
      ...mdx({
        remarkRehypeOptions: {
          handlers: {
            html: (state, node) => {
              console.log(state, node)
              return node
            },
          },
          unknownHandler: (state, node) => {
            console.log(state, node)
            return node
          },
        },
        remarkPlugins: [
          remarkGfm,
          remarkMatter,
          options => {
            return tree => {
              visit(tree, 'mdxJsxFlowElement', function (node, index, parent) {
                if (node.name === 'Demo') {
                  // console.log(node.attributes, node.children)
                  node.attributes.push({
                    type: 'mdxJsxAttribute',
                    name: 'code',
                    value: toMarkdown(node.children[0], { extensions: [mdxJsxToMarkdown()] }),
                  })
                }
              })
              return tree
            }
          },
        ],
        rehypePlugins: [],
      }),
    },
    react(),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
