import React, { useContext } from "react"
import { useHistory, Link } from "react-router-dom"
import Cookies from "js-cookie"

import { makeStyles, Theme } from "@material-ui/core/styles"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"

import { signOut } from "lib/api/auth"

import { AuthContext } from "../../provider/AuthContext"

const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit"
  },
  linkBtn: {
    textTransform: "none"
  }
}));

export const Header = () => {
  //グローバル変数の呼び出し
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const classes = useStyles();
  //useHistoryは戻るとかそんな感じ
  const history = useHistory();

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    //ログアウトのボタンが押された場合
    try {
      const res = await signOut();
      //signOut関数が実行し、変数resの格納

      if (res.data.success === true ){
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");
        //フロント側でもコピーしたaccess_token等を消す

        setIsSignedIn(false)
        history.push("/signin")
        //ログイン画面に遷移するため、historyを使う

        console.log("ログアウトしました");
      } else {
        console.log("ログアウトに失敗しました");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const AuthButtons = () => {
    if(!loading) {
      if(isSignedIn) {
        return (
          <Button
            color = "inherit"
            className = {classes.linkBtn }
            onClick = { handleSignOut }
          >
            ログアウト
          </Button>
        )
      } else {
        return (
          <Button
            component = {Link}
            to = "/signin"
            color = "inherit"
            className = { classes.linkBtn }
          >
            ログイン
          </Button>
        )
      }
    } else {
      return <></>
    }
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge = "start"
            className = { classes.iconButton }
            color = "inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component = { Link }
            to = "/"
            variant = "h6"
            className = { classes.title }
          >
            CKcalorie
          </Typography>
          <AuthButtons />
        </Toolbar>
      </AppBar>
    </>
  )
}