export default ({ graphQLErrors, networkError, operation, forward }, nuxtContext) => {
    console.log(networkError)
    nuxtContext.error({
      statusCode: 404,
      message: graphQLErrors,
    });
  };