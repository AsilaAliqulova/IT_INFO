const router = require("express").Router();
const dictRoute = require("./dict.route");
const SynonymRoute = require("./synonym.route");
const DescRoute = require("./desc.route");
const CategoryRoute = require("./category.route");
const AuthorRoute = require("./author.route");
const SocialRoute = require("./social.route");
const AuthorSocialRoute = require("./authorSocial.route");
const TopicRoute = require("./topic.route");
const TagRoute = require("./tag.route");
const DescTopicRoute = require("./descTopic");
const UserRoute = require("./user.route");
const AdminRoute = require("./admin.route");


router.use("/dictionary", dictRoute);
router.use("/admin", AdminRoute);
router.use("/syn", SynonymRoute);
router.use("/desc", DescRoute);
router.use("/category", CategoryRoute);
router.use("/author", AuthorRoute);
router.use("/social", SocialRoute);
router.use("/authorSocial", AuthorSocialRoute);
router.use("/topic", TopicRoute);
router.use("/tag", TagRoute);
router.use("/descTop", DescTopicRoute);
router.use("/user", UserRoute);

module.exports = router;
