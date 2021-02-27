import React, { useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";

import { CardDeck, Card, Button } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Swal from "sweetalert2";

import { axiosReportsUsers } from "../../../../modules/helpers";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  title: {
    flexGrow: 1,
  },
});

function RegsitrantVerify({ match }, props) {
  const classes = useStyles();
  const [btnSuccess, setBtnSuccess] = React.useState();
  const [btnFail, setBtnFail] = React.useState();
  const [btnDisabled, setBtnDisabled] = React.useState();
  const [registrantData, setRegistrantData] = React.useState([]);
  const [verifFull, setVerifFull] = React.useState("");
  const [idRegister, setIdRegister] = React.useState("");

  const id = match.params.id;

  const onChangeVerif = (event) => {
    let rdFullNameTrue = document.querySelector("input[name=fullnameTrueX]")
      .checked;
    let rdFullNameFalse = document.querySelector("input[name=fullnameFalseX]")
      .checked;
    let rdNisnTrue = document.querySelector("input[name=nisnTrueX]").checked;
    let rdNisnFalse = document.querySelector("input[name=nisnFalseX]").checked;
    let rdBornTrue = document.querySelector("input[name=bornTrueX]").checked;
    let rdBornFalse = document.querySelector("input[name=bornFalseX]").checked;
    let rdFromSchTrue = document.querySelector("input[name=fromSchoolTrueX]")
      .checked;
    let rdFromSchFalse = document.querySelector("input[name=fromSchoolFalseX]")
      .checked;

    if (!rdFullNameTrue && !rdFullNameFalse) {
      setBtnSuccess(true);
      setBtnFail(true);
    } else if (!rdNisnTrue && !rdNisnFalse) {
      setBtnSuccess(true);
      setBtnFail(true);
    } else if (!rdBornTrue && !rdBornFalse) {
      setBtnSuccess(true);
      setBtnFail(true);
    } else if (!rdFromSchTrue && !rdFromSchFalse) {
      setBtnSuccess(true);
      setBtnFail(true);
    } else {
      setBtnDisabled(false);
      if (rdFullNameTrue && rdNisnTrue && rdBornTrue && rdFromSchTrue) {
        setVerifFull({
          registrantData: id,
          resultVerify: "verified",
          fullNameVerify: rdFullNameTrue,
          nisnVerify: rdNisnTrue,
          bornPlaceVerify: rdBornTrue,
          dateBornVerify: rdBornTrue,
          fromSchoolVerify: rdFromSchTrue,
          notedVerify: "verified",
        });
        setBtnSuccess(false);
        setBtnFail(true);
      } else {
        setVerifFull({
          registrantData: id,
          resultVerify: "unverified",
          fullNameVerify: rdFullNameTrue,
          nisnVerify: rdNisnTrue,
          bornPlaceVerify: rdBornTrue,
          dateBornVerify: rdBornTrue,
          fromSchoolVerify: rdFromSchTrue,
        });
        setBtnSuccess(true);
        setBtnFail(false);
      }
    }
  };

  const onLoading = () => {
    let timerInterval;

    Swal.fire({
      title: "Silahkan tunggu..",
      timer: 9999999,
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getContent();
          if (content) {
            const b = content.querySelector("b");
            if (b) {
              b.textContent = Swal.getTimerLeft();
            }
          }
        }, 100);
      },
      onClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  };

  useEffect(() => {
    let renderChange;

    setBtnSuccess(true);
    setBtnFail(true);

    onLoading();
    axiosReportsUsers()
      .get(`ppdb/id/${id}`)
      .then((res) => {
        if (res.data.data[0].checkVerifyBiodata === "yes") {
          setRegistrantData(res.data.data[0]);
          setIdRegister(res.data.data[0].idRegister);
          Swal.fire({
            icon: "success",
            title: "Sukses mengambil data",
          }).then((result) => {
            renderChange = setInterval(onChangeVerif, 500);
          });
        } else {
          Swal.fire({
            icon: "error",
            title:
              "Maaf, tidak bisa verifikasi ulang pendaftar yang sudah terverifikasi",
          }).then((result) => {
            navigateTo();
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Gagal mengambil data, silahkan coba kembali",
        });
      });

    return () => {
      clearInterval(renderChange);
    };
  }, []);

  const onVerSuccess = () => {
    Swal.fire({
      title: "Verifikasi berhasil?",
      text: "Pastikan semua data pendaftar benar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, semua data benar!",
    }).then((result) => {
      if (result.value) {
        onLoading();

        const postVerify = axiosReportsUsers().post(`verify`, {
          ...verifFull,
          idRegister: idRegister,
        });
        const updateVerify = axiosReportsUsers().put(`ppdb/id/${id}`, {
          checkVerifyBiodata: "verified",
        });

        axiosReportsUsers()
          .all([postVerify, updateVerify])
          .then(
            axiosReportsUsers().spread((...responses) => {
              if (responses[0].status === 200 && responses[1].status === 200) {
                Swal.fire({
                  icon: "success",
                  title: `Verifikasi data atas nama ${registrantData.fullName} telah berhasil!`,
                }).then((result) => {
                  navigateTo();
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Gagal verifikasi data, silahkan coba kembali",
                });
              }
            })
          )
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Gagal verifikasi data, silahkan coba kembali",
            });
          });
      }
    });
  };

  const onVerFail = () => {
    console.log(verifFull);
    Swal.fire({
      title: "Verifikasi gagal?",
      text:
        "Verifikasi data pendaftar ini terkonfirmasi gagal, pastikan semua data pendaftar benar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
    }).then((result) => {
      if (result.value) {
        Swal.mixin({
          input: "text",
          confirmButtonText: "Next &rarr;",
          showCancelButton: true,
          progressSteps: ["1"],
        })
          .queue([
            {
              title: "Catatan verifikasi",
              text: "Tambahkan catatan untuk verifikasi gagal ini",
            },
          ])
          .then((result) => {
            if (result.value) {
              const answer = result.value;
              const dataAnswer = answer.toString();

              const postVerify = axiosReportsUsers().post(`verify`, {
                ...verifFull,
                idRegister: idRegister,
                notedVerify: dataAnswer,
              });
              const updateVerify = axiosReportsUsers().put(`ppdb/id/${id}`, {
                checkVerifyBiodata: "unverified",
              });

              onLoading();
              axiosReportsUsers()
                .all([postVerify, updateVerify])
                .then(
                  axiosReportsUsers().spread((...responses) => {
                    if (
                      responses[0].status === 200 &&
                      responses[1].status === 200
                    ) {
                      Swal.fire({
                        icon: "success",
                        title: `Verifikasi data atas nama ${registrantData.fullName} telah terverifikasi gagal!`,
                      }).then((result) => {
                        navigateTo();
                      });
                    } else {
                      Swal.fire({
                        icon: "error",
                        title: "Gagal verifikasi data, silahkan coba kembali",
                      });
                    }
                  })
                )
                .catch((error) => {
                  Swal.fire({
                    icon: "error",
                    title: "Gagal verifikasi data, silahkan coba kembali",
                  });
                });
            }
          });
      }
    });
  };

  const history = useHistory();
  const navigateTo = () => history.push("/regist-table");

  return (
    <div>
      <div
        style={{ marginTop: "50px", marginBottom: "50px", textAlign: "center" }}
      >
        <Typography variant="h5" className={classes.title}>
          Verifikasi Biodata
        </Typography>
      </div>
      <CardDeck>
        <Card>
          <Card.Body>
            <Card.Title>Nama lengkap</Card.Title>
            <Card.Text>{registrantData.fullName}</Card.Text>
            <FormControl component="fieldset">
              <RadioGroup row aria-label="position" name="position">
                <FormControlLabel
                  control={
                    <Radio
                      color="primary"
                      value="fullnameTrue"
                      name="fullnameTrueX"
                    />
                  }
                  label="Benar"
                />
                <FormControlLabel
                  control={
                    <Radio
                      color="primary"
                      value="fullNameFalse"
                      name="fullnameFalseX"
                    />
                  }
                  label="Salah"
                />
              </RadioGroup>
            </FormControl>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>NISN</Card.Title>
            <Card.Text>{registrantData.nisn}</Card.Text>
            <FormControl component="fieldset">
              <RadioGroup row aria-label="position" name="position">
                <FormControlLabel
                  control={
                    <Radio color="primary" value="nisnTrue" name="nisnTrueX" />
                  }
                  label="Benar"
                />
                <FormControlLabel
                  control={
                    <Radio
                      color="primary"
                      value="nisnFalse"
                      name="nisnFalseX"
                    />
                  }
                  label="Salah"
                />
              </RadioGroup>
            </FormControl>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Tempat tanggal lahir</Card.Title>
            <Card.Text>
              {`${registrantData.bornPlace}, ${registrantData.dateBorn}`}
            </Card.Text>
            <FormControl component="fieldset">
              <RadioGroup row aria-label="position" name="position">
                <FormControlLabel
                  control={
                    <Radio color="primary" value="bornTrue" name="bornTrueX" />
                  }
                  label="Benar"
                />
                <FormControlLabel
                  control={
                    <Radio
                      color="primary"
                      value="bornFalse"
                      name="bornFalseX"
                    />
                  }
                  label="Salah"
                />
              </RadioGroup>
            </FormControl>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Asal sekolah</Card.Title>
            <Card.Text>{registrantData.fromSchool}</Card.Text>
            <FormControl component="fieldset">
              <RadioGroup row aria-label="position" name="position">
                <FormControlLabel
                  control={
                    <Radio
                      color="primary"
                      value="fromSchoolTrue"
                      name="fromSchoolTrueX"
                    />
                  }
                  label="Benar"
                />
                <FormControlLabel
                  control={
                    <Radio
                      color="primary"
                      value="fromSchoolFalse"
                      name="fromSchoolFalseX"
                    />
                  }
                  label="Salah"
                />
              </RadioGroup>
            </FormControl>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </CardDeck>
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <Button
          variant="success"
          disabled={btnSuccess}
          style={{ marginTop: "10px", marginRight: "10px" }}
          onClick={onVerSuccess}
        >
          Verifikasi Sukses
        </Button>
        <Button
          variant="danger"
          disabled={btnFail}
          style={{ marginTop: "10px", marginRight: "10px" }}
          onClick={onVerFail}
        >
          Verifikasi Gagal
        </Button>
        <Button
          variant="secondary"
          style={{ marginTop: "10px", marginRight: "10px" }}
          onClick={navigateTo}
        >
          Kembali
        </Button>
      </div>
    </div>
  );
}

export default withRouter(RegsitrantVerify);
