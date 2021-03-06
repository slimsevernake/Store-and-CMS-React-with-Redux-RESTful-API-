import React from "react"
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import withRouterParams from "components/hoc/withRouterParams"
import { Link } from "react-router-dom"
import styles from "layouts/Cms/cmsLayout.module.sass"

const fallback = () => (
  <div>Загрузка модуля...</div>
)
const ReviewsList = loadable(() => import('components/ReviewsList'), {
  fallback: fallback()
})


const mapMethodsToProps = (apiService, { cityId }) => ({
  getAllReviews: apiService.getAllReviews(cityId),
  delete: apiService.deleteReview
})


const ReviewsListContainer = compose(
  withRouterParams,
  withApiService(mapMethodsToProps),
  withData({
    getDataMethod: 'getAllReviews',
    dataPropName: 'reviews',
    loadingText: 'reviews'
  })
)(ReviewsList)

const CmsReviewsPage = () => (
  <CmsLayout>
    <h1>Отзывы</h1>
    <Link className={styles.addBtn} to={`${window.location.pathname}/add`}>Добавить</Link>
    <ReviewsListContainer/>
  </CmsLayout>
)

export default CmsReviewsPage