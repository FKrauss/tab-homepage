import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import TextPageContent from 'src/components/TextPageContent'
import TextPageHeader from 'src/components/TextPageHeader'
import { orderBy } from 'lodash/collection'
import FinancialsQuarterButton from 'src/components/FinancialsQuarterButton'
import Layout from 'src/components/Layout'

const FinancialsPage = ({ data, location }) => {
  const financialsEdges = data.allFinancialsYaml.edges
  const sortedFinancialsEdges = orderBy(
    financialsEdges,
    ['node.year', 'node.quarter'],
    ['desc', 'desc']
  )
  const openGraphTitle = 'Financials - Tab for a Cause'
  const openGraphDescription =
    'See our expenses and how much money Tabbers have raised for each charity.'
  return (
    <Layout brand={'all'} location={location}>
      <div>
        <Helmet title={'Financials'}>
          <meta property="og:title" content={openGraphTitle} />
          <meta property="og:description" content={openGraphDescription} />
          <meta name="twitter:title" content={openGraphTitle} />
          <meta name="twitter:description" content={openGraphDescription} />
        </Helmet>
        <TextPageContent>
          <TextPageHeader>Financials</TextPageHeader>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {sortedFinancialsEdges.map(quarter => {
              return (
                <FinancialsQuarterButton
                  key={`Q${quarter.node.quarter}${quarter.node.year}`}
                  quarterData={quarter.node}
                />
              )
            })}
          </div>
        </TextPageContent>
      </div>
    </Layout>
  )
}

FinancialsPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    allFinancialsYaml: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            quarter: PropTypes.number.isRequired,
            year: PropTypes.number.isRequired,
            pdfUrl: PropTypes.string.isRequired,
          }),
        })
      ),
    }),
  }),
}

export const query = graphql`
  query QuarterlyFinancialsQuery {
    allFinancialsYaml {
      edges {
        node {
          quarter
          year
          pdfUrl
        }
      }
    }
  }
`

export default FinancialsPage
