import React from 'react'

function Heading({Heading , SubHeading1 ,SubHeading2     }: {Heading: string, SubHeading1: string, SubHeading2: string}) {
  return <>
  
     <div className="mb-10 text-center">
          <span className="text-[9px] dark:text-[rgb(215,84,88)] font-semibold uppercase tracking-[0.3em] text-[rgb(255,102,139)]">
            {Heading}
          </span>
          <br />
          <h2
            className="mt-0.5 relative isolate  inline-block 
          text-[rgb(116,28,33)] before:absolute before:inset-x-1/12
           before:bottom-1.5 before:z-0 before:h-2.5 before:rounded-full before:bg-[rgb(255,102,139)]/25 
           before:content-['']  dark:text-[rgb(255,194,208)] text-4xl font-bold  decoration-[rgb(255,102,139)] "
          >
            <span className="underline  decoration-[rgb(230,80,115)] dark:decoration-[rgb(255,102,139)]">
              {SubHeading1}
            </span>{" "}
            {SubHeading2}
          </h2>
        </div>
  
  
  </>
}

export default Heading