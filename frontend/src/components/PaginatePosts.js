import React, { useContext, useState} from 'react'
import axios from 'axios';
import Post from './Post';
import Pagination from './Pagination'
import { Button } from 'react-bootstrap';
import { StatesContext } from './StatesContext';
import { useNavigate } from 'react-router-dom';
import CountdownTimer from './RemainingTime';

function PaginatePosts() {
  const [loginSuccesss, setLoginSuccesss] = useState(true);
  let navigate = useNavigate()

  let {
    setIsloading,
    userid,
    setJob,
    setPosts,
    posts,
    setStarted,
    currentPage,
    setCurrentPage,
    postsPerPage,
    setScore,
    logged,
    eligble} = useContext(StatesContext);
    const [progress, setProgress] = useState(false)
  const fetchPosts = async () => {
    
    setIsloading(true);
    const resp = await axios.get(`http://localhost:8000/api/exam-cand/${userid}`)
    let joob = resp.data.job
    console.log(joob, "The job")
    setJob(joob)
    if(resp.data.job)
    {
      const res = await axios.get(`http://localhost:8000/api/questions/${joob}`)
      console.log(res.data, "all qw")
      setPosts(res.data);
      setIsloading(false);
      setStarted(true)
      if (res.data && res.data.length >= 1)
      {
        setProgress(true)
      }
    }
  }
  const currentPosts = posts.slice(currentPage, currentPage + postsPerPage);
  // paginate
  const paginatePrev = ()=> {
    setCurrentPage(currentPage = currentPage >= 1 ? currentPage - postsPerPage : 0)
  }
  const paginateNext = ()=> {
    setCurrentPage(currentPage = currentPage < posts.length - 1? currentPage + postsPerPage : posts.length - 1)
  }
  const viewResult = async ()=>{
    const examresult = await axios.get(`http://localhost:8000/api/exam-result/${userid}/`)
    setScore({"score":examresult.data.score, "total": examresult.data.total})
    navigate("/exam-result")
  }

  if (logged) {
    setTimeout(()=>{
      // console.log('hello*');
      setLoginSuccesss(false);
    }, 7200)
  }

  return (
    <div className='container-fluid '>
      {!eligble?
      <div className='row'>
         {logged && loginSuccesss && <h5 className='text-success border border-light bg-light py-3 text-center'>You Logged in successfully!</h5>}
        <div className='text-center text-secondary mt-5 view-result'>
            <Button className='bg-secondary' onClick={viewResult}>View Result</Button>
        </div>
      </div>
      :eligble && !progress?
      <div className='row justify-content-center bcg'>
       
        <div className=' mt-1 text-centerview-result'>
          {logged && loginSuccesss && <h5 className='text-success border border-light bg-light py-3 text-center'>You Logged in successfully!</h5>}
          <Button className='col-6 col-md-2 col-lg-2' onClick={fetchPosts}>Start Exam</Button>
        </div>
      </div>
      :
      <div className='row justify-content-center mt-5'>
        <h2 className='col-sm-6 col-lg-4'>Exam on Progress!</h2> 
        <hr/>
        <CountdownTimer />
        <hr/>
        <Pagination paginatePrev={paginatePrev} paginateNext={paginateNext}/>
        <hr/>
        <p>{currentPage} of {posts.length - 1}</p>
        <Post currentPosts={currentPosts}/>   
      </div>
      }
    </div>
  )
}

export default PaginatePosts;
