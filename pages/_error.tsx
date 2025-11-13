import Layout from '../components/Layout'

export default function ErrorPage({ statusCode }: { statusCode?: number }) {
  return (
    <Layout title="Error">
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Oops!</h1>
        <p className="text-gray-600">
          {statusCode
            ? `An error ${statusCode} occurred on the server.`
            : 'An error occurred on the client.'}
        </p>
      </div>
    </Layout>
  )
}

ErrorPage.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}
