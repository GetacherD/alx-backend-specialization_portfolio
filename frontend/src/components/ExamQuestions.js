import React, { useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import ExamQuestionsForm from './ExamQuestionsForm';
import NavigatorButton from './NavigatorButton'
import { StatesContext } from './StatesContext';
import CountdownTimer from './RemainingTime';
import API from './API';
// import ExamQuestions from './ExamQuestionsForm';

function ExamQuestions() {
  const [loginSuccesss, setLoginSuccesss] = useState(true);
  let navigate = useNavigate()

  let {
    setAllowedTime,
    job,
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
  try{
   
    console.log("The Job is is", job)
      const res = await API.get(`api/questions/${job}`)
      console.log(res.data, "all qw")
      setPosts(res.data);
      setIsloading(false);
      setStarted(true)
      setProgress(true)
      localStorage.setItem("isLoading", false)
      localStorage.setItem("started", true)
      localStorage.setItem("progress", true)
      navigate("/exam")
   
  }
  catch (e)
  {
    console.log("No questions")
    
    setIsloading(false)
    setStarted(false)
    setProgress(false)
    localStorage.setItem("isLoading", false)
    localStorage.setItem("started", false)
    localStorage.setItem("progress", false)
    navigate("/")
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
  // const viewResult = async ()=>{
  //  try{
  //   const examresult = await API.get(`api/exam-result/${userid}/`)
    
  //   setScore({"score":examresult.data.score, "total": examresult.data.total})
  //   navigate("/exam-result")
  //  }
  //  catch(e)
  //  {
  //     navigate("/")
  //  }
  // }

  if (logged) {
    setTimeout(()=>{
      setLoginSuccesss(false);
    }, 72000)
  }


  return (
    <div className='container-fluid '>
      {/* {!eligble?
      <div className='row'>
         {logged && loginSuccesss && <h5 className='text-success border border-light bg-light py-3 text-center'>You Logged in successfully!</h5>}
        <div className='text-center text-secondary mt-5 view-result'>
            <Button className='bg-secondary' onClick={viewResult}>View Result</Button>
        </div>
      </div>
      :*/}
      {
      eligble && !progress? 
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

        <NavigatorButton paginatePrev={paginatePrev} paginateNext={paginateNext}/>
        <hr/>

        <p>{currentPage} of {posts.length - 1}</p>
        <ExamQuestionsForm currentPosts={currentPosts}/>   
      </div>
      }
    </div>
  )
}

export default ExamQuestions;