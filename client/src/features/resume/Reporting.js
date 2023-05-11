import React, { useState, useEffect } from "react";
import axios from 'axios';
import Plot from 'react-plotly.js';

const Reporting = () => {
  const [jobTitles, setJobTitles] = useState([]);
  const [resumeMatches, setResumeMatches] = useState([]);
  const [resumesPerJob, setResumesPerJob] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const jobTitlesResponse = await axios.get('http://localhost:5000/jobopenings');
      const resumeMatchesResponse = await axios.get('http://localhost:5000/resume');

      const jobTitlesData = jobTitlesResponse.data.reduce((acc, curr) => {
        acc[curr.jobtitle] = acc[curr.jobtitle] ? acc[curr.jobtitle] + 1 : 1;
        return acc;
      }, {});

      const resumeMatchesData = resumeMatchesResponse.data.reduce((acc, curr) => {
        acc[curr.match] = acc[curr.match] ? acc[curr.match] + 1 : 1;
        return acc;
      }, { 'yes': 0, 'no': 0 });
      const resumesPerJobData = jobTitlesResponse.data.reduce((acc, curr) => {
        const resumeCount = resumeMatchesResponse.data.filter((resume) => resume.forthepostof === curr.jobtitle).length;
        acc[curr.jobtitle] = resumeCount;
        return acc;
      }, {});

      setJobTitles(jobTitlesData);
      setResumeMatches(resumeMatchesData);
      setResumesPerJob(resumesPerJobData);

    }

    fetchData();
  }, []);

  const content = (
    //         <>
    //     <div>
    //       <h1>Job Openings by Title</h1>
    //       <Plot
    //         data={[
    //           {
    //             values: Object.values(jobTitles),
    //             labels: Object.keys(jobTitles),
    //             type: 'pie',
    //           },
    //         ]}
    //         layout={{ height: 400, title: 'Job Openings by Title' }}
    //       />

    //       <h1>Resume Matches</h1>
    //       <Plot
    //         data={[
    //           {
    //             values: Object.values(resumeMatches),
    //             labels: Object.keys(resumeMatches),
    //             type: 'pie',
    //           },
    //         ]}
    //         layout={{ height: 400, title: 'Resume Matches' }}
    //       />
    //     </div>
    //     <div>
    //     <h1>Resumes per Job</h1>
    //         <Plot
    //           data={[
    //             {
    //               values: Object.values(resumesPerJob),
    //               labels: Object.keys(resumesPerJob),
    //               type: 'pie',
    //             },
    //           ]}
    //           layout={{ height: 400, title: 'Resumes per Job' }}
    //         />
    //       </div>
    // </>


    <>
      <button type="button" class="btn btn-primary col-2 " data-bs-toggle="modal" data-bs-target="#resumeroport">
        Resume Statistics
      </button>
      <div class="modal fade" id="resumeroport" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="ReqLeaveFormLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Resume Statistics</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <h1>Job Openings by Title</h1>
              <Plot
                data={[
                  {
                    values: Object.values(jobTitles),
                    labels: Object.keys(jobTitles),
                    type: 'pie',
                  },
                ]}
                layout={{ height: 400, title: 'Job Openings by Title' }}
              />

              <h1>Resume Matches</h1>
              <Plot
                data={[
                  {
                    values: Object.values(resumeMatches),
                    labels: Object.keys(resumeMatches),
                    type: 'pie',
                  },
                ]}
                layout={{ height: 400, title: 'Resume Matches' }}
              />
            </div>
            <div>
              <h1>Resumes per Job</h1>
              <Plot
                data={[
                  {
                    values: Object.values(resumesPerJob),
                    labels: Object.keys(resumesPerJob),
                    type: 'pie',
                  },
                ]}
                layout={{ height: 400, title: 'Resumes per Job' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
  return content
}
export default Reporting