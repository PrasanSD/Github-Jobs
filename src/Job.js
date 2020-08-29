import React, { useState } from "react";
import { Card, Badge, Button, Collapse, CardImg } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

export default function Job({ job }) {
  const [open, setOpen] = useState(false);
  var date1 = new Date();
  var date2 = new Date(job.created_at);
  var res = Math.abs(date1 - date2) / 1000;
  var days = Math.floor(res / 86400);

  return (
    <Card className="mb-3">
      <CardImg
        variant="top"
        src={job.company_logo}
        alt={job.company}
        style={{
          objectFit: "contain",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          maxHeight: "200px",
          padding: "10px",
        }}
      />
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title>
              {job.title} -{" "}
              <span className="text-muted font-weight-light">
                {job.company}
              </span>
            </Card.Title>
            <Card.Subtitle className="text-muted mb-2">
              {new Date(job.created_at).toLocaleDateString()}
            </Card.Subtitle>
            <Badge variant="secondary" className="mr-2">
              {job.type}
            </Badge>
            <Badge variant="secondary">{job.location}</Badge>
            <div style={{ wordBreak: "break-all" }}>
              <ReactMarkdown source={job.how_to_apply} />
            </div>
          </div>
          {/* <img
            className="d-none d-md-block"
            height="50"
            alt={job.company}
            src={job.company_logo}
          /> */}
        </div>
        <Card.Text>
          <Button
            onClick={() => setOpen((prevOpen) => !prevOpen)}
            variant="primary"
            block
          >
            {open ? "Hide Details" : "View Details"}
          </Button>
        </Card.Text>
        <Collapse in={open}>
          <div className="mt-4">
            <ReactMarkdown source={job.description} />
          </div>
        </Collapse>
      </Card.Body>
      <Card.Footer className="text-muted text-center">
        {days === 1 ? `${days} day ago` : `${days} days ago`}
      </Card.Footer>
    </Card>
  );
}
