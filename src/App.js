import React, { useState } from "react";
import useFetchJobs from "./useFetchJobs";
import { Container, Spinner } from "react-bootstrap";
import Job from "./Job";
import JobsPagination from "./JobsPagination";
import SearchForm from "./SearchForm";
import Loader from "react-loader-spinner";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">GitHub Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {/* {loading && <h1>Loading...</h1>} */}
      {loading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Loader
            type="TailSpin"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
          {/* <Spinner animation="border" role="status" variant="primary">
            <span className="sr-only">Loading...</span>
          </Spinner> */}
        </div>
      )}
      {error && <h1>Error. Try Refreshing.</h1>}
      {jobs.map((job) => {
        return <Job key={job.id} job={job} />;
      })}
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

export default App;
