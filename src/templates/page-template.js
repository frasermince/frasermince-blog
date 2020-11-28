// @flow strict
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';
import { MDXProvider } from '@mdx-js/react';
import type { Mdx } from '../types';
import { MDXRenderer, MDXProvider } from "gatsby-plugin-mdx";
import { LazyPlot } from './Plotly';

export type Props = {
  data: {
    mdx: Mdx
  };
};

export const components = {
  LazyPlot
};

const PageTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { body: pageBody } = data.mdx;
  const { frontmatter } = data.mdx;
  const { title: pageTitle, description: pageDescription, socialImage } = frontmatter;
  const metaDescription = pageDescription !== null ? pageDescription : siteSubtitle;

  return (
    <MDXProvider components={components}>
      <Layout title={`${pageTitle} - ${siteTitle}`} description={metaDescription} socialImage={socialImage} >
        <Sidebar />
        <Page title={pageTitle}>
          <MDXRenderer>{post.body}</MDXRenderer>
        </Page>
      </Layout>
    </MDXProvider>
  );
};

export const query = graphql`
  query PageBySlug($slug: String!) {
    allMdx(fields: { slug: { eq: $slug } }) {
      id
      body
      frontmatter {
        title
        date
        description
        socialImage
      }
    }
  }
`;

export default PageTemplate;
